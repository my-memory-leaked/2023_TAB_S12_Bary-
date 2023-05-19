using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Gdziekupuja.Controllers;

[Route("api/file")]
[ApiController]
public class FileController : ControllerBase
{
	[HttpGet]
	public ActionResult GetFile([FromQuery] string fileName)
	{
		var rootPath = Directory.GetCurrentDirectory();
		var path = $"{rootPath}/wwwroot/{fileName}";
		
		if (!System.IO.File.Exists(path))
			return NotFound();

		var contentProvider = new FileExtensionContentTypeProvider();
		contentProvider.TryGetContentType(path, out var contentType);

		var fileContentes = System.IO.File.ReadAllBytes(path);

		return File(fileContentes, contentType);
	}
}