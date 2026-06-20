# Hobby Planner

Een persoonlijke hobby-agenda gebouwd met Next.js, React, TypeScript en Tailwind CSS. De applicatie maakt het mogelijk om activiteiten rondom verschillende hobby's te plannen, bekijken, bewerken en verwijderen.

## Functionaliteiten
- Overzicht van activiteiten
  - Agendaweergave
  - Kalenderweergave
- Activiteit bekijken
- Activiteit bewerken
- Activiteit verwijderen
- Hobbycategorieën met eigen kleuren
- Filteren op hobbycategorie
- Opslag in localStorage
- Responsief ontwerp
- Kalenderweergave met react-big-calendar

## Technologieën
- Next.js
- React
- TypeScript
- Tailwind CSS
- react-big-calendar

## Installatie en setup
``` bash
npm install
npm run dev
```

Open vervolgens:

```
http://localhost:3000
```

Er is nog geen functie om activiteiten toe te voegen, dus run een script zoals hieronder in de browser console om de kalender met wat taken op te vullen
``` js
localStorage.setItem(
  "activities",
  JSON.stringify(
    Array.from({ length: 12 }, (_, i) => ({
      id: crypto.randomUUID(),
      title: `Activity ${i + 1}`,
      date: `2026-07-${String((i * 3) % 22 + 1).padStart(2, "0")}`,
      time: `${String(9 + (i % 10)).padStart(2, "0")}:00`,
      categoryId: [
        "gaming",
        "walking",
        "boardgames",
        "programming"
      ][i % 4],
      description: "Demo activity"
    }))
  )
);

location.reload();
```

## reflectie

Voor deze opdracht heb ik gekozen om localStorage te gebruiken voor de opslag van activiteiten. Hierdoor kon ik de applicatie simpel houden en meer tijd besteden aan de frontend, navigatie en gebruikerservaring in plaats van aan het opzetten van een backend. De hobbycategorieën zijn op dit moment hard-coded. Ik zou deze ook dynamisch willen maken, zodat verschillende gebruikers hun eigen hobby’s kunnen hebben.

Voor de kalenderweergave heb ik gebruikgemaakt van react-big-calendar. Ik wilde hiermee tijd besparen door niet zelf een kalender te hoeven bouwen, maar het kostte alsnog tijd om deze goed te integreren, bijvoorbeeld voor de kleuren van categorieën, maandnavigatie en het openen van activiteiten vanuit de kalender.

Mijn focus lag vooral op een duidelijke mappenstructuur en een uitbreidbare applicatie. Ik heb geprobeerd functionaliteit op te splitsen in herbruikbare componenten en de code overzichtelijk te houden. Qua functionaliteit heb ik prioriteit gegeven aan de belangrijkste onderdelen van de opdracht, zoals het bekijken, filteren, bewerken en verwijderen van activiteiten, maar ik had uiteindelijk geen tijd meer voor het toevoegen van activiteiten.

### Wat ik nog meer had willen doen
- Nieuwe activiteiten aanmaken
- Nieuwe hobbycategorieën aanmaken
- Hobbycategorieën beheren
- Ondersteuning voor de week-, dag- en agendaweergave van react-big-calendar
- Dark mode
- Verbeteringen van de UI
  - Dezelfde layout gebruiken voor de detail- en bewerkpagina
  - De detailpagina verticaal centreren
  - Categorie select aanpassen zodat het goed werkt met meer categoriën

### Mogelijke vervolgstappen

Als ik verder zou werken aan deze applicatie, zou ik als volgende stap een backend met database toevoegen. Hierdoor kunnen activiteiten en categorieën centraal worden opgeslagen en kan de applicatie door meerdere gebruikers worden gebruikt. Daarnaast zou ik ondersteuning toevoegen voor terugkerende activiteiten en herinneringen.