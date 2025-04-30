package com.localuploader.api.controller.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @PostMapping
    public String upload(@RequestParam(defaultValue = "${upload.path}") String path,
            @RequestBody List<MultipartFile> files) {
        for (MultipartFile eachFile : files) {
            try {
                Files.write(Paths.get(path, eachFile.getOriginalFilename()), eachFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return "upload success";
    }
}
