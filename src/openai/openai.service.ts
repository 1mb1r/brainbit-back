import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class OpenaiService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly apiOrg: string;
  private readonly apiProject: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.apiUrl = this.configService.get<string>('OPENAI_API_URL');
    this.apiOrg = this.configService.get<string>('OPENAI_API_ORG');
    this.apiProject = this.configService.get<string>('OPENAI_API_PROJECT');
  }

  async generateText(prompt: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Organization': this.apiOrg,
      'OpenAI-Project': this.apiProject,
    };

    const body = {
      model: 'gpt-3.5-turbo-1106',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    };

    const { data } = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}`, body, { headers }).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw 'error';
        }),
      ),
    );

    return data;
  }
}
