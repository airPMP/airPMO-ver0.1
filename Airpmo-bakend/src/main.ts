import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {  DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {

    if(process.env.STRICT_DOMAIN==="true")
    {
        if(process.env.APP_URL===req.headers.origin)
        {  
          next();
        }
        else
        {
         return res.status(401).json({"error":"cors not allowed"});  
        }
    }
    else
    {
    next();
    }
    
    });
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
  .setTitle('API DOCUMENTATION')
  .setDescription('ALL ENDPOINTS INFORMATION IS AVAILABLE')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter the JWT token',
      in: 'header',
    },
  )
  .build()

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
}
  
bootstrap();
