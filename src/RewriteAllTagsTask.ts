import * as _path from "path"
import { compact } from "./Array"
import { ExifToolTask } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"

export class RewriteAllTagsTask extends ExifToolTask<void> {
  private constructor(args: string[]) {
    super(args)
  }

  static for(
    imgSrc: string,
    imgDest: string,
    allowMakerNoteRepair: boolean
  ): RewriteAllTagsTask {
    // -all= -tagsfromfile @ -all:all -unsafe -icc_profile bad.jpg

    const args = compact([
      ...Utf8FilenameCharsetArgs,
      "-all=",
      "-tagsfromfile",
      "@",
      "-all:all",
      "-unsafe",
      "-icc_profile",
      allowMakerNoteRepair ? "-F" : undefined,
      "-out",
      _path.resolve(imgDest),
      _path.resolve(imgSrc),
    ])
    return new RewriteAllTagsTask(args)
  }

  parse(data: string, error?: Error): void {
    if (error != null) {
      const str = String(error)
      // Ignore warnings:
      if (str.match(/\berror\b/i) != null && !str.match(/\bwarning\b/i)) {
        throw error
      }
    }
    if (null == data.match(/^\s*1 image files creat/i)) {
      throw (
        error ??
        new Error(
          data.trim().split("\n")[0] ?? "Missing expected status message"
        )
      )
    }
  }
}
