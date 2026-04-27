// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OzAPI from 'oz-agent-sdk';

const client = new OzAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  // Mock server tests are disabled
  test.skip('checkRedirect', async () => {
    const responsePromise = client.agent.sessions.checkRedirect('sessionUuid');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
