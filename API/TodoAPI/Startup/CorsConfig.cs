using System;

namespace TodoAPI.Startup;

public static class CorsConfig
{
    private static readonly string OpenDoorCorsPolicy = "OpenDoorPolicy";
    public static void AddOpenDoorCorsPolicy(this IServiceCollection services)
    {
        services.AddCors((options) =>
        {
            options.AddPolicy(OpenDoorCorsPolicy, (policy) =>
            {
                policy.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });
    }    

    public static void UseOpenDoorCorsPolicy(this IApplicationBuilder app)
    {
        app.UseCors(OpenDoorCorsPolicy);
    }
}
