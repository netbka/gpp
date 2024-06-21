import { joinURL } from "ufo";
export default defineEventHandler(async (event) => {
  let proxyURL = useRuntimeConfig().public.baseUrl;
  let path = event.path.replace(/^\/api\//, "");
  let { method, url, headers } = event.node.req;
  //console.log("headers", headers);
  const target = joinURL(proxyURL, path);

  //const body = method !== "GET" && method !== "HEAD" ? await readBody(event) : undefined;
  try {
    //console.log("this is server request: " + event);
    return await proxyRequest(event, target);

    // return response._data;
  } catch (error) {
    console.log("this is error: " + error);

    return createError({
      statusCode: error.status,
      statusMessage: error.message,
      data: error.data,
    });
  }
});
