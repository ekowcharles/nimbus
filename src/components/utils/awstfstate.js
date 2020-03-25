import { onlyUnique, getAccountIdFromArn, getRegionFromArn } from './general'

const { JSONPath } = require('jsonpath-plus');

// $ - default values
// # - function

// attributes_field - where in the path the attributes of the resource can be found
// key_field - field in the resultant resource to be used as key for mapping to complete set of attributes
// arn_field - field in the source attribute to use for account_id and region extraction, must be provided if regionFromArn or accountIdFromArn are used
// field_mappings - the mapping of resultant resource field to source attribute field

const terraformScrapingSchema = {
  "vpcs": {
    "path": "$.resources[?(@.type==\"aws_vpc\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "id",
    "arn_field": "arn",
    "field_mappings": {
      "id": "id",
      "arn": "arn",
      "account_id": "owner_id",
      "region": "#regionFromArn",
      "cidr": "cidr_block",
      "state": "$unknown",
      "default": "$default"
    }
  },
  "subnets": {
    "path": "$.resources[?(@.type==\"aws_subnet\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "id",
    "arn_field": "arn",
    "field_mappings": {
      "id": "id",
      "arn": "arn",
      "vpc_id": "vpc_id",
      "account_id": "owner_id",
      "region": "#regionFromArn",
      "state": "$unknown",
      "default": "$default",
      "availability_zone": "availability_zone",
      "cidr": "cidr_block"
    }
  },
  "instances": {
    "path": "$.resources[?(@.type==\"aws_instance\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "id",
    "arn_field": "arn",
    "field_mappings": {
      "id": "id",
      "account_id": "#accountIdFromArn",
      "region": "#regionFromArn",
      "arn": "arn",
      "instance_state": "instance_state",
      "instance_type": "instance_type",
      "availability_zone": "availability_zone",
      "subnet_id": "subnet_id"
    }
  },
  "buckets": {
    "path": "$.resources[?(@.type==\"aws_s3_bucket\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "name",
    "field_mappings": {
      "account_id": "$unknown",
      "name": "bucket",
      "region": "region",
      "empty": "$unknown",
    }
  },
  "db_instances": {
    "path": "$.resources[?(@.type==\"aws_db_instance\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "id",
    "arn_field": "arn",
    "field_mappings": {
      "id": "identifier",
      "account_id": "#accountIdFromArn",
      "region": "#regionFromArn",
      "availability_zone": "availability_zone",
      "status": "status"
    }
  },
  "amis": {
    "path": "$.resources[?(@.type==\"aws_ami\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "id",
    "field_mappings": {
      "id": "image_id",
      "account_id": "ownerId",
      "region": "$unknown",
      "status": "status"
    }
  },
  "accessanalyzer_analyzers": {
    "path": "$.resources[?(@.type==\"aws_accessanalyzer_analyzer\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "id",
    "arn_field": "arn",
    "field_mappings": {
      "id": "id",
      "account_id": "#accountIdFromArn",
      "region": "#regionFromArn",
    }
  },
  "certificates": {
    "path": "$.resources[?(@.type==\"aws_acm_certificate\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "domain_name",
    "arn_field": "certificate_authority_arn",
    "field_mappings": {
      "id": "domain_name",
      "account_id": "#accountIdFromArn",
      "region": "#regionFromArn",
    }
  },
  "certificate_authorities": {
    "path": "$.resources[?(@.type==\"aws_acm_certificate_authority\")].instances[*]",
    "attributes_field": "attributes",
    "key_field": "arn",
    "arn_field": "arn",
    "field_mappings": {
      "id": "arn",
      "account_id": "#accountIdFromArn",
      "region": "#regionFromArn",
      "status": "status"
    }
  },
}

// retrieve all accounts - from ownerID, from arn
// retrieve all regions - from availability zones, from arn, from regions

export function parseState(attrUpdate, tfstate) {
  let allResources = {}

  Object.keys(terraformScrapingSchema).forEach((resourceType, _) => {
    const resourceSchema = terraformScrapingSchema[resourceType]

    allResources[resourceType] = [] // Initialize resource type values to empty array

    const resources = JSONPath({
      path: resourceSchema.path,
      json: tfstate || {}
    }).filter(onlyUnique) // retrieve resources of the same type

    resources.forEach((resource, _) => {
      let scapeResource = {}

      const attributes = resource[resourceSchema.attributes_field] // set where resource attributes will be extracted from

      Object.keys(resourceSchema.field_mappings).forEach((mappingKey, _) => {
        const mappingValue = resourceSchema.field_mappings[mappingKey]

        if (mappingValue.startsWith("$")) {
          scapeResource[mappingKey] = mappingValue.substring(1) // use default value specified in schema excluding the prefix
        } if (mappingValue.startsWith("#")) {
          switch (mappingValue) {
            case "#accountIdFromArn":
              scapeResource[mappingKey] = getAccountIdFromArn(attributes[resourceSchema.arn_field])
              break;
            case "#regionFromArn":
              scapeResource[mappingKey] = getRegionFromArn(attributes[resourceSchema.arn_field])
              break;
            default:
              console.error("Function undefined " + mappingValue)
              resources[mappingKey] = undefined
          }
        } else {
          scapeResource[mappingKey] = attributes[mappingValue] // extract the attribute in terraform
        }
      })

      const key = scapeResource[resourceSchema.key_field]
      attrUpdate(key, attributes) // store the field mapped to the attributes, to be presented when user clicks on the resource 

      allResources[resourceType].push(scapeResource) // add resource to list of resources extracted from state file
    })
  })

  return allResources
}

export function setAttributes(attrUpdate, resources) {
  Object.keys(resources).forEach((resourceType, _) => {
    resources[resourceType].forEach((resource, _) => {
      const key = resource.id !== undefined ? resource.id : (resource.arn !== undefined ? resource.arn : resource.name);

      attrUpdate(key, resource)
    })
  })
}

// https://www.geeksforgeeks.org/sets-in-javascript/
// eslint-disable-next-line
Set.prototype.difference = function (otherSet) {
  var differenceSet = new Set();

  for (var element of this) {
    if (!otherSet.has(element))
      differenceSet.add(element);
  }

  return differenceSet;
}

export function backfill(resources) {
  let morphedResources = backfillSubnets(resources)
  morphedResources = backfillVpcs(morphedResources)

  return morphedResources
}

function backfillVpcs(resources) {
  let morphedResources = JSON.parse(JSON.stringify(resources))

  const subnetVpcIds = new Set(JSONPath({
    path: "$.subnets.[*].vpc_id",
    json: resources
  }).filter(onlyUnique))

  const extractedVpcIds = new Set(JSONPath({
    path: "$.vpcs.[*].id",
    json: resources
  }).filter(onlyUnique))

  const untrackedVpcIds = Array.from(subnetVpcIds.difference(extractedVpcIds))

  untrackedVpcIds.forEach((vpcId, _) => {
    const subnetWithUntrackedVpc = JSONPath({
      path: "$.subnets.[?(@.vpc_id=\"" + vpcId + "\")]",
      json: resources
    })[0]

    morphedResources["vpcs"].push({
      "id": subnetWithUntrackedVpc.vpc_id,
      "arn": "arn:aws:ec2:" + subnetWithUntrackedVpc.region + ":" + subnetWithUntrackedVpc.account_id + ":vpc/" + subnetWithUntrackedVpc.vpc_id,
      "account_id": subnetWithUntrackedVpc.account_id,
      "region": subnetWithUntrackedVpc.region
    })
  })

  return morphedResources
}

function backfillSubnets(resources) {
  let morphedResources = JSON.parse(JSON.stringify(resources))

  const instanceSubnetIds = new Set(JSONPath({
    path: "$.instances.[*].subnet_id",
    json: resources
  }).filter(onlyUnique))

  const extractedSubnetIds = new Set(JSONPath({
    path: "$.subnets.[*].id",
    json: resources
  }).filter(onlyUnique))

  const untrackedSubnetIds = Array.from(instanceSubnetIds.difference(extractedSubnetIds))

  untrackedSubnetIds.forEach((subnetId, _) => {
    const instanceWithUntrackedSubnet = JSONPath({
      path: "$.instances.[?(@.subnet_id=\"" + subnetId + "\")]",
      json: resources
    })[0]

    const derivedSubnet = {
      "id": instanceWithUntrackedSubnet.subnet_id,
      "arn": "arn:aws:ec2:" + instanceWithUntrackedSubnet.region + ":" + instanceWithUntrackedSubnet.account_id + ":subnet/" + instanceWithUntrackedSubnet.subnet_id,
      "account_id": instanceWithUntrackedSubnet.account_id,
      "region": instanceWithUntrackedSubnet.region,
      "availability_zone": instanceWithUntrackedSubnet.availability_zone,
      "vpc_id": "vpc-unknown"
    }

    morphedResources["subnets"].push(derivedSubnet)
  })

  return morphedResources
}