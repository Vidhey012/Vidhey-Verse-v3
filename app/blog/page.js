// @flow strict

// import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";
import blogsData from '@/utils/data/blogs.json';

async function getBlogs() {
  // const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }

  // const data = await res.json();
  // return data;
  return blogsData;
};


async function page() {
  const blogs = await getBlogs();
  const blogImages = Array.from({ length: 75 }, (_, i) => `/blogs/${i + 1}.jpg`);
  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="head bg-[#1a144375] w-fit text-white text-center p-2 px-5 text-2xl rounded-md">
            Technical Certifications
            
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          // blogs.map((blog, i) => (
          //   blog?.cover_image &&
          //   <BlogCard blog={blog} key={i} />
          // ))
          blogImages.map((img, i) => (
              <BlogCard blog={img} key={i} />
          ))
        }
        
      </div>
    </div>
  );
};

export default page;