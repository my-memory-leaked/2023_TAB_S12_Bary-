using Gdziekupuja.Exceptions;

namespace Gdziekupuja;

public class ErrorHandlingMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (NotFoundException nfe)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync(nfe.Message);
        }
        catch (NotUniqueElementException nue)
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync(nue.Message);
        }
        catch (InvalidOperationException ioe)
        {
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync(ioe.Message);
        }
        catch (InvalidDataException ide)
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync(ide.Message);
        }
        catch (Exception)
        {
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync("Coś poszło nie tak");
        }
    }
}