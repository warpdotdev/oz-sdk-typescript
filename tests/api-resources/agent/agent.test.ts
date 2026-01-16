// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import WarpAPI from 'warp-agent-sdk';

const client = new WarpAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  // Prism tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.agent.run({ prompt: 'Fix the bug in auth.go' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.agent.run({
      prompt: 'Fix the bug in auth.go',
      config: {
        base_prompt: 'base_prompt',
        environment_id: 'environment_id',
        mcp_servers: {
          foo: {
            args: ['string'],
            command: 'command',
            env: { foo: 'string' },
            headers: { foo: 'string' },
            url: 'https://example.com',
            warp_id: 'warp_id',
          },
        },
        model_id: 'model_id',
        name: 'name',
      },
      team: true,
      title: 'title',
    });
  });
});
