import { CalendarEvent, CalendarEventAction} from "angular-calendar";
import { Appointment, colors } from "../models/appointment";

export function calendarEventFromAppointment(item:Appointment, actions?:CalendarEventAction[]):CalendarEvent{
    let ret_item:CalendarEvent={
      id:item.id,
      start:item.start,
      end:item.end,
      title:item.title,
      color:colors[item.color],            
      actions:actions,
      meta: item.type
    }
    return ret_item;
  }