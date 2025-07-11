export type HeroId = `${string}-${string}-${string}-${string}-${string}`
export type Person = {
    id: HeroId;
    name: string;
    age: number;
    birth?: Date;
};
