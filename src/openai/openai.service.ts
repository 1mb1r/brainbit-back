import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class OpenaiService {
  private readonly apiKey: string;
  private readonly apiUrl: string = 'https://api.openai.com/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async generateText(prompt: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };

    const { data } = await firstValueFrom(
      this.httpService
        .post(`${this.apiUrl}/chat/completions`, body, { headers })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'error';
          }),
        ),
    );

    return data;
  }
}
