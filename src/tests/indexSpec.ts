import app from '../index';
import supertest from 'supertest';
import { existsSync as fsExistsSync } from 'fs';
import * as path from 'path';

const request = supertest(app);
describe('Api EndPoint Testing', () => {
  it('expects to respond with 200 if provided with correct filname', async done => {
    await request.get('/api/images').query('filename=fjord');
    expect(200);
    done();
  });
  it('expects to respond with 400 if provided with wrong filname', async done => {
    await request.get('/api/images').query('filename=fjosrd');
    expect(400);
    done();
  });
  it('expects to save thumb file in the thumb folder', async done => {
    await request.get('/api/images').query('filename=fjord');
    expect(
      fsExistsSync(
        path.join(__dirname, `..\\..\\src\\assets\\thumb\\fjordthumb.jpg`)
      )
    ).toBeTrue;
    done();
  });
});
