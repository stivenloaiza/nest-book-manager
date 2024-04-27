import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Swagger')
@Controller()
export class AppController {
  @Get('/')
  swagger() {
    return `<div style="text-align: center; margin-top: 5rem;">
      <h1>Webservice Book-Manager</h1>
      <p>Documentation API: <a href="/api-doc">swagger</a></p>
      </div>`;
  }
}
