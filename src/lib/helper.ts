import directus from "./directus";
import {readSingleton, readItems ,rest } from "@directus/sdk";

const collection_ : 'block_contents' | 'posts' | 'pages' = 'block_contents';
const directusAssetsPath = import.meta.env.YOUR_DIRECTUS_IMAGE_URL;

export function applyFiltersToQuery(filters: Record<string, any>) {
    if (!filters || typeof filters !== 'object') return {};

    const queryFilters: Record<string, any> = {};

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const filterValue = filters[key];

            if (typeof filterValue === 'object' && filterValue !== null) {
                for (const operator in filterValue) {
                    if (filterValue.hasOwnProperty(operator)) {
                        queryFilters[key] = queryFilters[key] || {};
                        queryFilters[key][`_${operator}`] = filterValue[operator];
                    }
                }
            } else {
                queryFilters[key] = { _eq: filterValue };
            }
        }
    }

    return queryFilters;
}
// Hàm sẽ lấy phần tử đầu tiên của mảng và trả về nó về một đối tượng mới
export function getFirstElement<T>(array: T[]): T {
    return array[0];
}
// Hàm trả về danh sách BlockContents với key chứa giá trị truyền vào
export async function getBlockContents(key:string){

    const client = directus.with(rest());
    const solution_filters = {
        key: { contains: key }
    };

    const query = {
    filter: applyFiltersToQuery(solution_filters)
    };
    const result = await client.request(readItems('block_contents', query));
    // console.error("Display data:", result);
    return result;
}
// Hàm trả về 1 BlockContent đầu tiên với key chứa giá trị truyền vào
export async function getOneBlockContent(key:string){
    const blockContents = await getBlockContents(key);
    return getFirstElement(blockContents);
}

// Hàm trả về danh sách BlockContents với key chứa giá trị truyền vào
export async function getElementDatas(key:string, 
    collection: typeof collection_ = 'block_contents'){

    const client = directus.with(rest());
    const solution_filters = {
        key: { contains: key }
    };

    const query = {
    filter: applyFiltersToQuery(solution_filters)
    };
    const result = await client.request(readItems(collection, query));
    // console.error("Display data:", result);
    return result;
}
// Hàm trả về 1 BlockContent đầu tiên với key chứa giá trị truyền vào
export async function getOneElementData(key:string,
    collection: typeof collection_ = 'block_contents')
{
    const blockContents = await getElementDatas(key,collection);
    return getFirstElement(blockContents);
}

// Hàm trả về 1 BlockContent đầu tiên với key chứa giá trị truyền vào
export async function getOneElementDataEx(key:string,
    collection:'block_contents' | 'posts' | 'pages' = 'block_contents')
{
    const blockContents = await getElementDatas(key,collection);
    return getFirstElement(blockContents);
}

export function getImageUrl(image: string) {
    return directusAssetsPath+image+'.png';
}