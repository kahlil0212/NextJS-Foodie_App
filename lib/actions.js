'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";


export async function shareMeal(formData){

        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        }

        await saveMeal(meal)
        //revalidates just one page
        //revalidatePath('/path', 'layout') - revalidates page and all nested paths. page is default and would just revalidate the one page/path
        revalidatePath('/meals');
        redirect('/meals');

    }