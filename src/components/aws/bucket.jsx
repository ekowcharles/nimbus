import React from 'react';
import bucketImg from '../../images/aws/bucket.png';
import emptyBucketImg from '../../images/aws/empty-bucket.png';
import Resource from './resource/index';

const Bucket = props => {
  const settings = props.settings

  var bucket = bucketImg
  if (props.bucket.empty === true) {
    bucket = emptyBucketImg
  }

  return (
    <Resource
      image={bucket}
      name={props.bucket.name}
      hideName={settings.hideName}
      hideStatus={settings.hideStatus}
      updateResourceAttributes={(e) => props.updateResourceAttributes(e, "bucket", props.bucket.name)}
    />
  );
};

export default Bucket;
