import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { randomUUID } from 'node:crypto';

const db = sql('meals.db');

export function getMeals(){

    
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals where slug = ?').get(slug);
}

export async function saveMeal(meal){

    meal.slug = slugify(meal.title, {lower: true}); //creating slug field based on meal title and lowercasing the value
    meal.instructions = xss(meal.instructions); // sanitizing instructions

    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}_${randomUUID()}.${extension}`

    const stream = fs.createWriteStream(`public/images/${filename}`)
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage),(error) => {
        if(error){
            throw new Error('Saving image failed');
        }

        meal.image = `/images/${filename}`

        db.prepare(`
            INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
            VALUES(
                
                @title,
                @summary,
                @instructions,
                @creator,
                @creator_email,
                @image,
                @slug
                )
        `).run(meal);
    });


}