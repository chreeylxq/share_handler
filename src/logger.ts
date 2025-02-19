import winston, { Logger } from 'winston';
import { ElasticsearchTransformer, ElasticsearchTransport, LogData, TransformedData } from 'winston-elasticsearch';

// const esTransformer = (logData: LogData): TransformedData => {
//     return ElasticsearchTransformer(logData);
// }

// export const winstonLogger = (elasticsearchNode: string, name: string, level: string): Logger => {
//     const options = {
//         console: {
//             level,
//             handleExceptions: true,
//             json: false,
//             colorize: true
//         },
//         elasticsearch: {
//             level,
//             transformer: esTransformer,
//             clientOpts: {
//                 node: elasticsearchNode,
//                 log: level,
//                 maxRetries: 2,
//                 requestTimeout: 10000,
//                 sniffOnStart: false
//             }
//         }
//     };
//     const esTransport: ElasticsearchTransport = new ElasticsearchTransport(options.elasticsearch);
//     const logger: Logger = winston.createLogger({
//         exitOnError: false,
//         defaultMeta: { service: name },
//         transports: [new winston.transports.Console(options.console), esTransport]
//     });
//     return logger;
// }
//将日志数据转换为Elasticsearch格式
const esTransformer = (logData: LogData): TransformedData => {
    return ElasticsearchTransformer(logData);
}

//配置winston 日志记录器，配置控制台输出和 Elasticsearch 存储两种日志传输方式
export const winstonLogger = (elasticsearch: string, name: string, level: string): Logger => {
    const options = {
        console: {
            level,//日志级别
            handleExceptions: true,//自动捕获未处理异常
            json: false, //不以json格式输出到控制台
            colorize: true //控制台输出日志颜色
        },
        elasticsearch: {
            level,
            transformer: esTransformer, //将日志数据转换为 Elasticsearch 格式
            clientOpts: { //elasticsearch 客户端配置
                node: elasticsearch, //Elasticsearch
                log: level,
                maxtries: 2, //写入失败时的最大重试次数
                requestTimeout: 10000, //请求超时时间（10s）
                sniffOnStart: false //禁用启动时检测集群拓扑
            }
        }

    }
    //配置控制台输出
    const transportsOnConsole = new winston.transports.Console(options.console);
    //配置到 elasticsearch
    const esTransport: ElasticsearchTransport = new ElasticsearchTransport(options.elasticsearch);
    const logger: Logger = winston.createLogger({
        exitOnError: false, //日志写入失败时，程序不退出
        defaultMeta: { server: name },//标识日志来源
        transports: [transportsOnConsole, esTransport]//配置日志传输方式
    });
    return logger;
}

