package ma.order.analysis.config;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@RequiredArgsConstructor
public class FileSaver {
    private final MediaFormater mediaFormater;
    @Value("${media.directory}")
    private String MyDirectory;
    public String saveFile(MultipartFile file) throws Exception {
        String originalFileName = file.getOriginalFilename();
        String fileName = mediaFormater.addRandomSequence(originalFileName);

        String filePath = String.valueOf(Paths.get(MyDirectory, fileName));

        Files.write(Path.of(filePath), file.getBytes());
        return fileName;
    }
}
