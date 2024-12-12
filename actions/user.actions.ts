'use server';

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const createUser = async (user:any) => {  
    try {
      const newUser = await prisma.user.create({
        data:{
          email:user.email,
          clerkId:user.clerkId,
          firstName:user.first_name,
            lastName:user.last_name,
        }
      })
      console.log(newUser);
      
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      // console.log('error when creating user' , error);
      // return JSON.parse(JSON.stringify('error when creating user' ))
    }
  }
 
  export const getUser = async () => {
 
    try {
      const use = await currentUser()
  
      const user = await prisma.user.findUnique({
        where:{
          id:Number(use?.publicMetadata.userId)
        },
        select:{
          id:true,
          email:true,
          firstName:true,
          lastName:true,
        }
      })
      return JSON.parse(JSON.stringify(user))
      
    } catch (error) {
      // console.log('error when fetching user' , error);
      return JSON.parse(JSON.stringify('error when fetching user' ))
    }
  } 
