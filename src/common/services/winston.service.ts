import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';
import { format, transports } from 'winston';
import Chalk from 'chalk';
import 'winston-daily-rotate-file';
import dayjs from 'dayjs';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  config = dotenv.parse(fs.readFileSync('.env'));
  private dailyRotateFileOption = {
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD',
    maxSize: '10m',
    maxFiles: '30d',
    json: false,
    silent: this.config.LOGGER_FILE != 'true',
  };

  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      exitOnError: false,
      handleExceptions: true,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.prettyPrint(),
        format.ms(),
      ),
      transports: [
        new transports.DailyRotateFile({
          ...this.dailyRotateFileOption,
          level: 'info',
          auditFile: path.join(
            __dirname,
            '..',
            'logs',
            `${dayjs(new Date()).format('yyyy-MM-dd')}-success.json`,
          ),
          filename: `%DATE%-success.log`,
        }),
        new transports.DailyRotateFile({
          ...this.dailyRotateFileOption,
          level: 'error',
          auditFile: path.join(
            __dirname,
            '..',
            'logs',
            `${dayjs(new Date()).format('yyyy-MM-dd')}-error.json`,
          ),
          filename: `%DATE%-error.log`,
        }),
        new transports.Console({
          silent: this.config.LOGGER_CONSOLE != 'true',
          format: format.combine(
            format.printf(info => {
              let color: string;
              let level: string;

              switch (info.level) {
                case 'info':
                  color = '#00c358';
                  level = ' Info  ';
                  break;
                case 'warn':
                  color = '#e4e700';
                  level = ' Warn  ';
                  break;
                case 'error':
                  color = '#e50048';
                  level = ' Error ';
                  break;
              }

              // 信息格式处理
              const message =
                Chalk.hex(color)(
                  '┌──────────────────────────────────────────────────────────────────────────────────────────────────┐\n ',
                ) +
                info.message +
                Chalk.hex(color)(
                  '\n└──────────────────────────────────────────────────────────────────────────────────────────────────┘',
                );

              return `${Chalk.bgHex(color)
                .hex('#000000')
                .bold(level)} ${Chalk.hex('#2196F3')(
                info.timestamp,
              )} ${Chalk.hex('#e4e700')('[' + info.context + ']')} ${Chalk.hex(
                '#e4e700',
              )(info.ms)}: \n${message}`;
            }),
          ),
        }),
      ],
    };
  }
}
