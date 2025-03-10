import {
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';

export class HarpaAiTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Harpa AI Trigger',
    name: 'harpaAiTrigger',
    icon: 'file:harpa-ai.svg',
    group: ['trigger'],
    version: 1,
    description: 'Triggers when Harpa Chrome Extension node has responded to a run action request',
    defaults: {
      name: 'Harpa AI Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'harpaAiApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Webhook URL',
        name: 'webhookUrl',
        type: 'string',
        default: '={{ $getNodeWebhookUrl }}',
        description: 'For more information on how to create a webhook in HARPA AI Web Browser Agent, see the online Help.'
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();
    const body = req.body;

    // Return the webhook response data
    return {
      workflowData: [
        this.helpers.returnJsonArray(body),
      ],
    };
  }
}