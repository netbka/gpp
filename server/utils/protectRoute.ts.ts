//import type { EventHandler, EventHandlerRequest } from "h3";

// export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
//   handler: EventHandler<T, D>
// ): EventHandler<T, D> =>
//     defineEventHandler<T>(async (event) => {
//       try {
//         const response = await handler(event)
//         return { response }
//       } catch (err) {
//       // Error handling
//         return { err }
//       }
//     })
// If the user does not exist on the request, throw a 401 error
import { H3Event } from "h3";
export default async (event: H3Event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  // Check to see if this user has access to this course
  const hasAccess = await $fetch("/api/user/hasAccess", {
    headers: {
      // Make sure to pass along the cookie with the user session
      cookie: getHeader(event, "cookie"),
    },
  });
  if (!hasAccess) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};
