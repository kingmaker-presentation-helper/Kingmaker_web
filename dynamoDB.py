import boto3

def get_dynamodb_data():
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('your_table_name')
    response = table.scan()
    return response['Items']
