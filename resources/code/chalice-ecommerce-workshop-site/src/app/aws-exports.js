const awsconfig =  {
    Auth: {
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:bbd5138c-5d24-4529-b2cf-59620a07f7cd',
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_32VnKl0zU',
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '4h2h42gqqqilq197pv1mdoje5j'
    },
    API: {
      endpoints: [
        {
            name: 'workshop-app',
            endpoint: ' https://3gd9t2ymca.execute-api.us-east-1.amazonaws.com/api'
        }
      ]
    }
}
export default aws-config;
