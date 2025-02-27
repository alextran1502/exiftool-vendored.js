import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ResourceEvent } from "./ResourceEvent"

/**
 * @see https://exiftool.org/TagNames/XMP.html#Version
 */
export interface Version {
  Comments?: string
  Event?: ResourceEvent
  Modifier?: string
  ModifyDate?: ExifDateTime | ExifDate | string
  Version?: string
}
