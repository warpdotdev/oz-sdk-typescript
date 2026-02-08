// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OzAPI from 'oz-agent-sdk';

const client = new OzAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource schedules', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agent.schedules.create({
      cron_schedule: '0 9 * * *',
      name: 'Daily Code Review',
      prompt: 'Review open pull requests and provide feedback',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.agent.schedules.create({
      cron_schedule: '0 9 * * *',
      name: 'Daily Code Review',
      prompt: 'Review open pull requests and provide feedback',
      agent_config: {
        base_prompt: 'base_prompt',
        computer_use_enabled: true,
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
        skill_spec: 'skill_spec',
        worker_host: 'worker_host',
      },
      enabled: true,
      team: true,
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.agent.schedules.retrieve('scheduleId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agent.schedules.update('scheduleId', {
      cron_schedule: 'cron_schedule',
      enabled: true,
      name: 'name',
      prompt: 'prompt',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.agent.schedules.update('scheduleId', {
      cron_schedule: 'cron_schedule',
      enabled: true,
      name: 'name',
      prompt: 'prompt',
      agent_config: {
        base_prompt: 'base_prompt',
        computer_use_enabled: true,
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
        skill_spec: 'skill_spec',
        worker_host: 'worker_host',
      },
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agent.schedules.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.agent.schedules.delete('scheduleId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('pause', async () => {
    const responsePromise = client.agent.schedules.pause('scheduleId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('resume', async () => {
    const responsePromise = client.agent.schedules.resume('scheduleId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
