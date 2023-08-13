import { get } from './base'

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get('/api/getSongsUrl', {
    mid: songs.map(song => {
      return song.mid
    })
  }).then(data => {
    const map = data.map
    return songs
      .map(song => {
        song.url = map[song.mid]
        return song
      })
      .filter(song => {
        return song.url && song.url.indexOf('vkey') > -1
      })
  })
}

// 缓存歌词
const lyricMap = {}
export function getLyric(song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }

  const mid = song.mid
  // 如果缓存中有当前的歌曲的歌词,则拿缓存中的歌词,避免重复请求
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid
  }).then(data => {
    const lyric = data ? data.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric // 获取到的歌词进行缓存
    return lyric
  })
}
