// @flow strict
// import { personalData } from "@/utils/data/personal-data";
// import blogsData from '@/utils/data/blogs.json';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';


async function getBlog(slug) {
  // const res = await fetch(`https://dev.to/api/articles/${personalData.devUsername}/${slug}`)

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }

  // const data = await res.json();

  // return data;
  const filePath = path.join(process.cwd(), 'src/utils/data/blogs.json'); // adjust if your path is different
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const blogsData = JSON.parse(fileContents);

  const blog = blogsData.find((b) => b.url.split('/').pop() === slug);

  if (!blog) {
    throw new Error('Blog not found');
  }
  return blog;
}

async function BlogDetails({params}) {
  const slug = params.slug;
  const blog = await getBlog(slug);

 
  // return (
  //   <div>
  //   </div>
  // );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      <img
        src={blog.cover_image}
        alt={blog.title}
        className="w-full rounded-lg mb-6"
      />
      <p className="text-gray-400 mb-4">{blog.description}</p>
      <div className="text-sm text-gray-500">
        Published on: {new Date(blog.published_at).toLocaleDateString()}
      </div>
      <div className="text-sm text-gray-500 mt-1">
        Reading Time: {blog.reading_time_minutes} min read
      </div>
    </div>
  );
}

export default BlogDetails;