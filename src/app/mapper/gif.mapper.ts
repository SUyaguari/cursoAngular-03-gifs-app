import { Gif } from "../gifs/interfaces/gif.interface"
import { GiphyItem } from "../gifs/interfaces/giphy.interface"

export class GifMapper {

  static mapGiphyItemToGif( item: GiphyItem): Gif {

    return{
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    }

  }

  static mapGiphyItemstoGifsArray( items: GiphyItem[]): Gif[] {

    return items.map(this.mapGiphyItemToGif)

  }

}
