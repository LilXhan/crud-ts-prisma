import express, {Express, Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app: Express = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.post('/post', async (req: Request, res: Response) => {
  const {title, content} = await req.body;
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content
    }
  });
  res.status(201).json(post);
});

app.get('/post', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts)
});

app.get('/post/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {id: Number(id)}
  });
  res.status(200).json(post);
});

app.delete('/post/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {id: Number(id)}
  });
  res.status(200).json({
    ok: true,
    message: 'post deleted'
  });
});

app.put('/post/:id',async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = await req.body;
  const post = await prisma.post.update({
    where: {id: Number(id)},
    data: {title, content}
  });
  res.status(200).json({
    ok: true,
    message: 'post updated'
  });
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
});
