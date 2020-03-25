import React from 'react';
import VpcList from './vpc_list';
import Bucket from './bucket';
import { DotLoader } from 'react-spinners';
import ResourceAttributes from './resource/attributes';
import InfraInput from './infra_input';
import GeneralResourceList from './general_resource_list';
import amiImg from '../../images/aws/ami.png'
import noImg from '../../images/aws/noImg.png'
import crtaImg from '../../images/aws/crta.png'
import crtmImg from '../../images/aws/crtm.png'
import Menu from './menu/index';

const generalResources = {
  unscoped: [
    {
      title: "AMIs",
      groups: [
        {
          key: "amis",
          image: amiImg,
          keyField: "id",
          displayField: "id"
        }
      ]
    }
  ],
  regional: [
    {
      title: "Access Analyzers",
      groups: [
        {
          key: "accessanalyzer_analyzers",
          image: noImg,
          keyField: "id",
          displayField: "id"
        }
      ]
    },
    {
      title: "ACM",
      groups: [
        {
          key: "certificates",
          image: crtmImg,
          keyField: "id",
          displayField: "id"
        },
        {
          key: "certificate_authorities",
          image: crtaImg,
          keyField: "id",
          displayField: "id"
        }
      ]
    }
  ]
}


const Aws = props => {
  const menuOptions = props.menuOptions

  let bucketList = null;
  let mainView = null

  const updateResourceAttributes = (e, _, key) => {
    e.stopPropagation();

    props.updateResourceAttributes(key)
  }

  const buckets = props.resource.buckets || []
  const vpcs = props.resource.vpcs || []

  if (!menuOptions.bucket.hide === true) {
    bucketList = buckets.map(
      (b, i) => (
        <Bucket
          key={i}
          bucket={b}
          settings={menuOptions.bucket}
          updateResourceAttributes={updateResourceAttributes} />
      )
    )
  }

  const unscopedResourcesView = (
    <GeneralResourceList
      key={1}
      general={false}
      details={generalResources.unscoped}
      resource={props.resource}
      updateResourceAttributes={updateResourceAttributes}
    />
  )

  const regionalResourcesView = (
    <GeneralResourceList
      key={2}
      accountId={props.accountId}
      region={props.region}
      general={true}
      details={generalResources.regional}
      resource={props.resource}
      updateResourceAttributes={updateResourceAttributes}
    />
  )

  if (props.loading === true) {
    mainView = (
      <div className="dashboard-details">
        <DotLoader
          size={120}
          color={'#1ec8c8'}
        />
      </div>
    )
  } else if (buckets.length === 0 && vpcs.length === 0) {
    mainView = <div className="message">Nothing to show here.</div>
  } else {
    mainView = (
      <React.Fragment>
        <div className="general-list">
          {unscopedResourcesView}
          {regionalResourcesView}
        </div>
        <div className="main">
          <div className="vpc-list">
            <VpcList
              resource={props.resource || {}}
              menuOptions={menuOptions}
              updateResourceAttributes={updateResourceAttributes}
              error={props.error}
              accountId={props.accountId}
              region={props.region}
            />
          </div>
          <div className="buckets">
            {bucketList}
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className="aws dashboard">
      <Menu
        menuOptions={menuOptions}
        update={props.updateOption}
      />
      <InfraInput
        viewType={props.viewType}
        updateViewType={props.updateViewType}
        updateTfstateOrSchema={props.updateTfstateOrSchema}
        changeRegionSelection={props.changeRegionSelection}
        accountId={props.accountId}
        region={props.region}
        inputCollapsed={props.inputCollapsed}
        toggleInputCollapsedClass={props.toggleInputCollapsedClass}
        resource={props.resource}
        setResource={props.setResource}
      />
      <ResourceAttributes
        resourceAttributes={props.resourceAttributes}
        detailsError={props.detailsError}
        attributesCollapsed={props.attributesCollapsed}
        toggleAttributesCollapsedClass={props.toggleAttributesCollapsedClass}
      />
      <div className="drawings">
        {mainView}
      </div>
    </div>
  );
};

export default Aws;
