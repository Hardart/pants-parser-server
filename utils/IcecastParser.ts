// class IcecastParser {
//     private static isTrackInit: boolean = false
//     static trackData: string | undefined = undefined
//     static cachedTrack: (Track & { id?: string }) | null = null
//     static track: (Track & { id?: string }) | null = null

//     static initStreamTitle(metadata: Map<string, string>) {
//       const streamTitle = metadata.get('StreamTitle')
//       if (this.trackData !== streamTitle) this.trackData = streamTitle
//     }

//     static async tryFindTrack() {
//       if (typeof this.trackData !== 'string') return
//       const [artistName, trackTitle] = this.trackData.split(' - ')
//       this.track = await trackService.findOne(artistName, trackTitle)
//     }

//     static addTrackToArchive() {
//       if (this.track && this.track.id) {
//         trackArchiveService.save(this.track.id)
//         this.cachedTrack = this.track
//       }
//     }
//   }
