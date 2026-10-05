// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import WarpClient from '@warp-dot-dev/warp-platform-sdk';

const client = new WarpClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource scorers', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.factories.scorers.create({
      allowed_classifications: [{ score: 0, value: 'x' }],
      factory_uid: 'x',
      model_id: 'x',
      name: 'x',
      scope_mode: 'all_agents',
      scoring_prompt: 'x',
      threshold: 0,
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
    const response = await client.factories.scorers.create({
      allowed_classifications: [
        {
          score: 0,
          value: 'x',
          description: 'description',
        },
      ],
      factory_uid: 'x',
      model_id: 'x',
      name: 'x',
      scope_mode: 'all_agents',
      scoring_prompt: 'x',
      threshold: 0,
      agent_config: {
        default_runner_uid: 'default_runner_uid',
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
        secrets: [{ name: 'name' }],
      },
      agent_uids: ['string'],
      agents: [{ uid: 'uid', include_descendants: true }],
      description: 'description',
      sampling_rate: 0,
      self_improvement_enabled: true,
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.factories.scorers.list();
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
      client.factories.scorers.list(
        {
          end_date: '2019-12-27T18:11:19.117Z',
          factory_uid: 'factory_uid',
          include_managed: true,
          recent_outcomes_limit: 0,
          start_date: '2019-12-27T18:11:19.117Z',
          team_uid: 'X-Warp-Team-Uid',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(WarpClient.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listResultReasons: only required params', async () => {
    const responsePromise = client.factories.scorers.listResultReasons(0, { run_id: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listResultReasons: required and optional params', async () => {
    const response = await client.factories.scorers.listResultReasons(0, {
      run_id: ['string'],
      team_uid: 'X-Warp-Team-Uid',
    });
  });

  // Mock server tests are disabled
  test.skip('listResults', async () => {
    const responsePromise = client.factories.scorers.listResults(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listResults: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.factories.scorers.listResults(
        0,
        {
          cursor: 'cursor',
          limit: 1,
          team_uid: 'X-Warp-Team-Uid',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(WarpClient.NotFoundError);
  });
});
