// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import WarpClient from '@warp-dot-dev/warp-platform-sdk';

const client = new WarpClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource runs', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.factories.benchmarks.runs.list('uid');
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
      client.factories.benchmarks.runs.list(
        'uid',
        {
          cursor: 'cursor',
          limit: 1,
          state: ['pending'],
          suite_uid: 'suite_uid',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(WarpClient.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.factories.benchmarks.runs.get('run_uid', { uid: 'uid' });
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
    const response = await client.factories.benchmarks.runs.get('run_uid', { uid: 'uid' });
  });

  // Mock server tests are disabled
  test.skip('getResults: only required params', async () => {
    const responsePromise = client.factories.benchmarks.runs.getResults('run_uid', { uid: 'uid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getResults: required and optional params', async () => {
    const response = await client.factories.benchmarks.runs.getResults('run_uid', { uid: 'uid' });
  });
});
