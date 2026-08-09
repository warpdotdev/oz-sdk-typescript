// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OzAPI from 'oz-agent-sdk';

const client = new OzAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agent.agent.create({ name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.agent.agent.create({
      name: 'name',
      agent_type: 'FOREMAN',
      base_harness: 'base_harness',
      base_model: 'base_model',
      credential_strategy: 'CREATOR',
      default_runner_uid: 'default_runner_uid',
      description: 'description',
      environment_id: 'environment_id',
      factory_uid: 'factory_uid',
      harness_auth_secrets: {
        claude_auth_secret_name: 'claude_auth_secret_name',
        codex_auth_secret_name: 'codex_auth_secret_name',
      },
      inference_providers: {
        aws: {
          disabled: true,
          region: 'region',
          role_arn: 'role_arn',
        },
      },
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
      memory: {
        attached_stores: [
          {
            access: 'read_write',
            instructions: 'instructions',
            uid: 'uid',
          },
        ],
        auto_memory: { enabled: true },
      },
      on_behalf_of_enabled: true,
      prompt: 'prompt',
      secrets: [{ name: 'name' }],
      skills: ['string'],
    });
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.agent.agent.update('uid', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agent.agent.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agent.agent.list({ factory_uid: 'factory_uid' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OzAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.agent.agent.delete('uid');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.agent.agent.get('uid');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
