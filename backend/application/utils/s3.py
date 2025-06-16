import boto3

from application import Config

session = boto3.Session(region_name="pl-waw")
s3 = session.resource('s3',
                      region_name='pl-waw',
                      use_ssl=True,
                      endpoint_url=Config.BUCKET_ENDPOINT,
                      aws_access_key_id=Config.SCALEWAY_ACCESS_KEY,
                      aws_secret_access_key=Config.SCALEWAY_SECRET_KEY)
