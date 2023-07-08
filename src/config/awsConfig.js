// not use in the app

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIA3KZVK3RM6V72UAHV",
  secretAccessKey: "tM53XJcse2fY4VvZoJ3xBJPy4j",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

export default s3;
