// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import WarpClient from '@warp-dot-dev/warp-platform-sdk';

const client = new WarpClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource networking', () => {
  // Mock server tests are disabled
  test.skip('getEgressRanges', async () => {
    const responsePromise = client.networking.getEgressRanges();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getEgressRanges: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.networking.getEgressRanges(
        { team_uid: 'X-Warp-Team-Uid' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(WarpClient.NotFoundError);
  });
});
