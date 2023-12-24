import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';

/* ----------引入爬虫所需插件---------- */
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SpiderService {
  async findAll() {
    const urls: string[] = [];
    const baseURL = 'https://littlesharing.cn';
    const body = await axios
      .get('https://littlesharing.cn/articleHome/66', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMywiYWNjb3VudCI6Im5vbl9oYW5hIiwiYXJ0aWNsZV9udW0iOjQsImxpa2VfbnVtIjowLCJjb2xsZWN0X251bSI6MCwiY29tbWVudF9udW0iOjAsImNyZWF0ZWRBdCI6IjIwMjMtMTItMDhUMDk6NDc6MTkuMDAwWiIsImlhdCI6MTcwMjU0MTQ2NiwiZXhwIjoxNzA1MTMzNDY2fQ.3XIIo25uj9d2J7hb6CxBgxcGmr1NwRpJno8aIM4bSpw',
        },
      })
      .then((res) => res.data);

    console.log(body);

    const $ = cheerio.load(body);
    $('.md-editor-preview-wrapper article p img').each(function () {
      urls.push(baseURL + $(this).attr('src'));
    });

    console.log(urls);
  }
}
