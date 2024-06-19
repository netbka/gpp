import { joinURL } from "ufo";
export default defineEventHandler(async (event) => {
  let proxyURL = useRuntimeConfig().public.baseUrl;
  let path = event.path.replace(/^\/api\//, "");
  let { method, url, headers } = event.node.req;

  const target = joinURL(proxyURL, path);
  console.log(target);

  //const body = method !== "GET" && method !== "HEAD" ? await readBody(event) : undefined;
  try {
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
