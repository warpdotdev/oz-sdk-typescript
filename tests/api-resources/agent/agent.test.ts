// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OzAPI from 'oz-agent-sdk';

const client = new OzAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agent.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agent.list(
        {
          refresh: true,
          repo: 'repo',
          sort_by: 'name',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OzAPI.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('run', async () => {
    const responsePromise = client.agent.run({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
