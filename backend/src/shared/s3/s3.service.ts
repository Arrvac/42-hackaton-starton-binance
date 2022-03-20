import { Injectable } from '@nestjs/common';
import { S3, Endpoint } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      endpoint: new Endpoint(process.env.S3_HOST),
      region: 'eu-west-3',
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
    });
  }

  async getS3PutObjectUrl(): Promise<string> {
    const url = await this.s3.getSignedUrlPromise('putObject', {
      Bucket: 'digitalrb-regions',
      Key: uuid(),
      ContentType: 'application/octet-stream',
      ACL: 'public-read',
      Expires: 300,
    });
    return url;
  }
}
