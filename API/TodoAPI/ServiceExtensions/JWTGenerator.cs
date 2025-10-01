using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TodoAPI.Dtos.Users;

namespace TodoAPI.ServiceExtensions;

public static class JWTGenerator
{
    public static void AddJwtAuthentication(
        this IServiceCollection service,
        IConfiguration config
    )
    {
        string secretKey = config["JWT:Secret:Key"];
        SymmetricSecurityKey actualKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        service.AddAuthentication("Bearer")
            .AddJwtBearer("Bearer", (options) =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,       // Optional for local
                    ValidateAudience = false,     // Optional for local
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = actualKey,
                };
            });
    }

    public static string GenerateToken(
        UserLoginDto userLoginInfo,
        IConfiguration config
    )
    {
        var claims = new[] {
            new Claim(ClaimTypes.Name, userLoginInfo.Username)
        };

        string secretKey = config["JWT:Secret:Key"];
        SymmetricSecurityKey actualKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var credentials = new SigningCredentials(
            actualKey,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
}
