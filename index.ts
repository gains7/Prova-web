//UserController//


import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, content, image_url } = req.body;
    const user = await prisma.user.create({
      data: { name, email, content, image_url },
    });
    res.json(user);
  }

  static async getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    res.json(users);
  }
}


//PostController//


import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PostController {
  static async createPost(req: Request, res: Response) {
    const { user_id, content, image_url } = req.body;
    const post = await prisma.post.create({
      data: { user_id, content, image_url },
    });
    res.json(post);
  }

  static async getPosts(req: Request, res: Response) {
    const posts = await prisma.post.findMany();
    res.json(posts);
  }
}


//CommentController//


import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CommentController {
  static async createComment(req: Request, res: Response) {
    const { post_id, user_id, content } = req.body;
    const comment = await prisma.comment.create({
      data: { post_id, user_id, content },
    });
    res.json(comment);
  }

  static async getComments(req: Request, res: Response) {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  }
}


//userRoutes//


import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);

export default router;


//postRoutes//


import { Router } from 'express';
import { PostController } from '../controllers/PostController';

const router = Router();

router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getPosts);

export default router;


//commentRoutes//


import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';

const router = Router();

router.post('/comments', CommentController.createComment);
router.get('/comments', CommentController.getComments);

export default router;


// server config// 


import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


