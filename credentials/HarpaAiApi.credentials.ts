import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class HarpaAiApi implements ICredentialType {
  name = 'harpaAiApi';
  displayName = 'Harpa AI API';
  documentationUrl = 'https://harpa.ai/grid/grid-rest-api-reference';
  
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
    },
  ];
  
  authenticate = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
      },
    },
  } as IAuthenticateGeneric;
}