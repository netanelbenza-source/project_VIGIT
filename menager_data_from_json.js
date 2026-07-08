import fs from 'fs/promises'


export async  function read_data_from_json() {
    const read_data = await fs.readFile('./data.json','utf-8')
    return JSON.parse(read_data)
}

