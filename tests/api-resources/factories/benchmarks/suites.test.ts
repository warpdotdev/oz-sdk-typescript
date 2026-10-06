// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import WarpClient from '@warp-dot-dev/warp-platform-sdk';

const client = new WarpClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource suites', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.factories.benchmarks.suites.create('uid', {
      agent_uid: 'agent_uid',
      factory_agent_type: 'factory_agent_type',
      name: 'name',
      suite_uid: 'uid',
    });
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
    const response = await client.factories.benchmarks.suites.create('uid', {
      agent_uid: 'agent_uid',
      factory_agent_type: 'factory_agent_type',
      name: 'name',
      suite_uid: 'uid',
      description: 'description',
      tasks: [
        {
          prompt: 'prompt',
          success_criteria: 'success_criteria',
          title: 'title',
          labels: { foo: 'string' },
          source_run_id: 'source_run_id',
          starting_repo_refs: [
            {
              code_forge: 'code_forge',
              owner: 'owner',
              repo: 'repo',
              ref: 'ref',
            },
          ],
          tags: ['string'],
          uid: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.factories.benchmarks.suites.list('uid');
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
      client.factories.benchmarks.suites.list(
        'uid',
        { cursor: 'cursor', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(WarpClient.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.factories.benchmarks.suites.get('suite_uid', { uid: 'uid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get: required and optional params', async () => {
    const response = await client.factories.benchmarks.suites.get('suite_uid', { uid: 'uid' });
  });

  // Mock server tests are disabled
  test.skip('launchRun: only required params', async () => {
    const responsePromise = client.factories.benchmarks.suites.launchRun('suite_uid', {
      uid: 'uid',
      repetition_count: 1,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('launchRun: required and optional params', async () => {
    const response = await client.factories.benchmarks.suites.launchRun('suite_uid', {
      uid: 'uid',
      repetition_count: 1,
      configurations: [
        {
          agent_configs: [
            {
              agent_uid: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
              harness: 'harness',
              model: 'model',
              agent_name: 'agent_name',
              harness_auth_secret_name: 'harness_auth_secret_name',
            },
          ],
          display_name: 'display_name',
          harness: 'harness',
          harness_auth_secret_name: 'harness_auth_secret_name',
          model: 'model',
          runner_id: 'runner_id',
        },
      ],
      historical_replay_run_uid: 'historical_replay_run_uid',
      scorer_selection: [0],
      tasks: ['7d69fb52-71c5-4e27-914e-8764ee9c5246', 'ad8ff7dc-a7d1-4ed6-9f50-650010bb39aa'],
    });
  });
});
