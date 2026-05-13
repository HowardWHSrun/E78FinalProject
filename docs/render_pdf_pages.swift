import AppKit
import Foundation
import PDFKit

let args = CommandLine.arguments
guard args.count == 3 else {
    fputs("usage: render_pdf_pages.swift input.pdf output_dir\n", stderr)
    exit(2)
}

let pdfURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2], isDirectory: true)
try FileManager.default.createDirectory(at: outURL, withIntermediateDirectories: true)

guard let document = PDFDocument(url: pdfURL) else {
    fputs("could not open PDF\n", stderr)
    exit(1)
}

let scale: CGFloat = 1.6

for pageIndex in 0..<document.pageCount {
    guard let page = document.page(at: pageIndex) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let width = Int(bounds.width * scale)
    let height = Int(bounds.height * scale)

    guard let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: width,
        pixelsHigh: height,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else {
        fputs("could not create bitmap for page \(pageIndex + 1)\n", stderr)
        exit(1)
    }

    guard let context = NSGraphicsContext(bitmapImageRep: rep) else {
        fputs("could not create graphics context\n", stderr)
        exit(1)
    }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    let cg = context.cgContext
    cg.setFillColor(NSColor.white.cgColor)
    cg.fill(CGRect(x: 0, y: 0, width: CGFloat(width), height: CGFloat(height)))
    cg.saveGState()
    cg.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: cg)
    cg.restoreGState()
    NSGraphicsContext.restoreGraphicsState()

    guard let png = rep.representation(using: .png, properties: [:]) else {
        fputs("could not encode page \(pageIndex + 1)\n", stderr)
        exit(1)
    }

    let pageURL = outURL.appendingPathComponent("page-\(pageIndex + 1).png")
    try png.write(to: pageURL)
}

print("rendered \(document.pageCount) pages")
