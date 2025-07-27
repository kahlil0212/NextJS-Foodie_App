import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export default async  function MealDetailsPage({params}){

    const {mealSlug} = await params; //params returns a promise and is expected to wait. therefore function should be async and await to get meal slug for api call

    const meal = getMeal(mealSlug)

    if(!meal){
        //meal is not found it will find closest not found page and render that page instead rendering current component
        notFound();
    }

    //Fixing styling from the new lines in the summary
    meal.instructions = meal.instructions.replace(/\n/g, '<br />')
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by<a href={`mailto:${meal.creator_email}`}>NAME</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions
                }}></p>
            </main>
        </>
    )
}